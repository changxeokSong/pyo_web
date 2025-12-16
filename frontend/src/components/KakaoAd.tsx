import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const KakaoAd = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Create the script element
        const script = document.createElement('script');
        script.src = "//t1.daumcdn.net/kas/static/ba.min.js";
        script.async = true;
        script.type = "text/javascript";

        // Append it to the container to execute it
        containerRef.current.appendChild(script);

        // Cleanup isn't strictly necessary for the global script, 
        // but we avoid appending duplicates if re-rendered rapidly without unmount.
        // However, cleaning up the script tag after execution doesn't unload the ad.
        // We'll leave it simple.
    }, []);

    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                overflow: 'hidden',
                my: 2
            }}
        >
            <ins
                className="kakao_ad_area"
                style={{ display: "none" }}
                data-ad-unit="DAN-Rclz0DEAHhej9xbd"
                data-ad-width="300"
                data-ad-height="250"
            />
        </Box>
    );
};

export default KakaoAd;
