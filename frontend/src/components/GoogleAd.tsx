import { useEffect } from 'react';

interface GoogleAdProps {
    slotId?: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    style?: React.CSSProperties;
    className?: string;
}

const GoogleAd = ({
    slotId = "7566922768",
    format = 'auto',
    style = { display: 'block' },
    className
}: GoogleAdProps) => {

    useEffect(() => {
        // Push the ad to the adsbygoogle array safely
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    // Use a development placeholder if in DEV mode
    if (import.meta.env.DEV) {
        return (
            <div className={className} style={{
                background: '#111',
                color: '#444',
                padding: '20px',
                textAlign: 'center',
                border: '1px dashed #333',
                margin: '20px 0',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100px',
                ...style
            }}>
                <div>
                    [GOOGLE_AD_SPACE]<br />
                    ID: {slotId}
                </div>
            </div>
        );
    }

    return (
        <div className={className}>
            <ins
                className="adsbygoogle"
                style={style}
                data-ad-client="ca-pub-5588783783772381"
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
};

export default GoogleAd;
