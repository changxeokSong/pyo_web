# 표글로리 웹 실행 가이드

표주상의 업적을 전시하는 웹 서비스입니다. Django + PostgreSQL 백엔드와 Vite + React 프런트엔드가 Docker Compose 로 묶여 있습니다. 아래 순서대로 따라 하면 바로 실행할 수 있습니다.

---

## 1. 환경 변수(.env) 준비

모든 비밀 값은 `backend/.env` 에서 읽습니다.

```bash
cd pyo_web
cp backend/.env.example backend/.env
```

`backend/.env` 안의 값을 실제 서버 정보로 채워 넣습니다.

```
DJANGO_SECRET_KEY=실제_랜덤_키
DJANGO_DEBUG=False          # 로컬 개발이면 True
POSTGRES_DB=pyo_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=강력한_비밀번호
POSTGRES_HOST=db            # Docker 사용 시 그대로 둡니다.
POSTGRES_PORT=5432
```

> `.env` 파일은 절대 깃에 올리지 마세요. 값을 바꾸면 `docker compose up -d` 로 다시 시작하면 됩니다.

### SECRET_KEY 빠르게 만들기

Python이 없어도 `openssl` 만 있으면 됩니다.

```bash
openssl rand -base64 48
```

위 출력값을 그대로 `DJANGO_SECRET_KEY=` 뒤에 붙이면 됩니다.  
만약 `openssl` 도 없다면 Docker만 설치되어 있어도 아래 명령으로 생성할 수 있습니다.

```bash
docker compose run --rm backend python - <<'PY'
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
PY
```

---

## 2. Docker 로 한번에 실행

```bash
docker compose up -d --build          # 컨테이너 빌드 및 실행
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

서비스 위치
- 프런트엔드: `http://localhost` (Nginx 프록시)
- 백엔드 API: `http://localhost/api/`
- 관리 페이지: `http://localhost/admin/`

중지하려면 `docker compose down` 을 실행하세요. 볼륨까지 지우려면 `docker compose down -v`.

---

## 3. 로컬 개발용 명령(선택)

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # 로컬 DB 정보 입력
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev   # http://localhost:5173
```

프런트는 개발 서버에서 백엔드 주소를 `vite.config.ts` 프록시로 전달합니다. 필요한 경우 `.env` 의 API 주소를 수정하세요.

---

## 4. 자주 쓰는 명령 요약

| 명령 | 설명 |
| --- | --- |
| `docker compose logs -f backend` | 백엔드 실시간 로그 |
| `docker compose exec backend python manage.py shell` | Django 쉘 접속 |
| `docker compose exec backend python manage.py collectstatic` | 정적 파일 수집 |
| `npm run build` (frontend) | 프런트 배포 번들 생성 |

---

## 5. SSL 재발급(필요할 때)

`letsencrypt` 폴더를 만들어 둔 뒤 다음 명령으로 강제 갱신합니다.

```bash
docker compose run --rm --entrypoint "" certbot \
  certbot certonly --webroot -w /var/www/certbot \
  -d pyo-glory.com -d www.pyo-glory.com \
  --email you@example.com --agree-tos --no-eff-email --force-renewal
docker compose restart nginx
```

문제가 생기면 `docker compose logs certbot` 로그를 확인하세요.
