# ☣️ 노답 아카이브 (No-Answer Archive)

> "지우고 싶어도 지워지지 않는 그날의 기억, 여기에 영원히 박제하십시오."
> **WARNING: Once uploaded, shame is eternal.**

**노답 아카이브**는 친구들의 흑역사(dark history)를 안전하게(?) 박제하고 영원히 고통받게 하기 위해 설계된 아카이빙 플랫폼입니다.  
사이버펑크/해커 테마의 UI를 갖추고 있으며, 데이터 삭제 요청은 정중히 거절됩니다.

---

## ✨ 주요 기능 (Key Features)

-   **🕵️ 흑역사 박제 (Archive Shame)**: 제목, 위치, 발생 시기, 내용을 기록하고 증거 자료를 첨부합니다. 모든 기록은 **Case No.**로 관리되어 영구적으로 추적됩니다.
-   **🕯️ 디지털 조문 (Digital Tribute)**: 박제된 영혼을 위해(?) 조롱의 한마디를 남기거나, 서버 유지비를 위한 후원(계좌 복사)을 할 수 있습니다. 
-   **🎥 증거 자료 첨부 (Evidence Upload)**: 사진뿐만 아니라 **동영상 증거**까지 확실하게 남길 수 있습니다. (동영상 재생 지원)
-   **🔒 원본 보존 (Original Source)**: 업로드된 미디어는 상세 보기에서 왜곡 없이 원본 그대로 감상할 수 있습니다.
-   **🚫 삭제 거부 (Deletion Refused)**: 이용약관 및 데이터 삭제 요청 버튼이 존재하지만, 클릭 시 시스템이 단호하게 거절합니다.
-   **📰 시스템 공지 (System Alerts)**: 최신 공지사항을 터미널 스타일로 확인할 수 있습니다.

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **UI Library**: Material UI (MUI) - Dark/Hacker Theme Customization
-   **Effect**: CSS Scanlines, Glitch Effects, Neon Glows

### Backend
-   **Framework**: Django REST Framework
-   **Database**: PostgreSQL
-   **Containerization**: Docker & Docker Compose

---

## 🚀 실행 가이드 (Quick Start)

이 프로젝트는 Docker Compose를 통해 백엔드와 프런트엔드를 한 번에 실행할 수 있도록 구성되어 있습니다.

### 1. 환경 변수 준비
`backend/.env` 파일을 생성하고 필요한 값을 채워 넣으세요.

```bash
cd pyo_web
cp backend/.env.example backend/.env
```

`.env` 예시:
```ini
DJANGO_SECRET_KEY=your_secret_key
DJANGO_DEBUG=True
POSTGRES_DB=pyo_db
POSTGRES_USER=admin
POSTGRES_PASSWORD=password
POSTGRES_HOST=db
POSTGRES_PORT=5432
```

### 2. Docker 실행
```bash
docker compose up -d --build
```
-   **Frontend**: `http://localhost`
-   **Backend API**: `http://localhost/api/`
-   **Admin**: `http://localhost/admin/`

### 3. 초기 설정 (마이그레이션)
```bash
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

---

## ⚠️ 주의사항 (Disclaimer)

본 서비스는 **정신적 피해**에 대해 책임지지 않습니다.  
우정 파괴의 원인이 될 수 있으니 주의하여 사용하십시오.

*Established 2025. All rights reserved by Your Dark Past.*
