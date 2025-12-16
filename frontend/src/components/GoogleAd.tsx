import { useEffect } from 'react';

interface GoogleAdProps {
    slotId?: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    style?: React.CSSProperties;
    className?: string;
}

const GoogleAd = ({
    slotId,
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

    // Use a development placeholder if no slot ID is provided
    if (!slotId) {
        if (import.meta.env.DEV) {
            return (
                <div style={{
                    background: '#222',
                    color: '#888',
                    padding: '20px',
                    textAlign: 'center',
                    border: '1px dashed #444',
                    margin: '20px 0',
                    fontFamily: 'monospace',
                    fontSize: '0.8rem',
                    ...style
                }}>
                    [Google Ad Placeholder]<br />
                    (No Slot ID provided)
                </div>
            );
        }
        return null; // Don't show anything in production without a slot ID
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
