import { PlaceMarker } from "../../../apis/performanceplaceApi";

interface PerformancePlaceModalProps {
    place: PlaceMarker;
    onClose: () => void;
}

function PerformancePlaceModal({ place, onClose }: PerformancePlaceModalProps) {
    
    const handleUrlClick = () => {
        if (place.url) {
            window.open(place.url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modalBody} onClick={(e) => e.stopPropagation()}>
                
                <h2 style={styles.title}>{place.prfPlcName}</h2>
                
                <p style={styles.infoItem}>
                    <strong>주소:</strong> {place.address || '정보 없음'}
                </p>
                
                <p style={styles.infoItem}>
                    <strong>전화번호:</strong> {place.tel || '정보 없음'}
                </p>
                
                {place.url && ( 
                    <button 
                        style={styles.urlButton} 
                        onClick={handleUrlClick}
                    >
                    </button>
                )}
                
                <button style={styles.closeButton} onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}

const styles = {
    overlay: { /* ... */ },
    modalBody: { /* ... */ },
    title: { /* ... */ },
    infoItem: { /* ... */ },
    urlButton: {
        width: '100%', padding: '12px', marginTop: '16px',
        backgroundColor: '#007BFF', color: 'white', border: 'none',
        borderRadius: '5px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold'
    },
    closeButton: {
        width: '100%', padding: '12px', marginTop: '10px',
        backgroundColor: '#6c757d', color: 'white', border: 'none',
        borderRadius: '5px', cursor: 'pointer', fontSize: '1rem'
    }
} as const;


export default PerformancePlaceModal;