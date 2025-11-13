import { PlaceMarker } from "../../../apis/performanceplaceApi";

interface PerformancePlaceModalProps {
    place: PlaceMarker;
    onClose: () => void;
}

function PerformancePlaceModal({ place, onClose }: PerformancePlaceModalProps) {
    
    const hasValidUrl = place.url && place.url.trim() !== "";

    const handleUrlClick = () => {
        if (hasValidUrl) {
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
                
                <button 
                    style={{
                        ...styles.urlButton,
                        ...(hasValidUrl ? {} : styles.disabledButton) 
                    }} 
                    onClick={handleUrlClick}
                    disabled={!hasValidUrl} 
                >
                    {hasValidUrl ? '공연장 방문' : '공연장 정보 없음'}
                </button>
                
                <button style={styles.closeButton} onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
}

const styles = {
    overlay: { 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 9999 //
    },
    modalBody: { 
        background: 'white', 
        padding: '24px', 
        borderRadius: '8px',
        width: '90%', 
        maxWidth: '450px',
        zIndex: 10000, 
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: '16px',
        color: '#333'
    },
    infoItem: {
        fontSize: '0.9rem',
        color: '#555',
        margin: '8px 0',
        lineHeight: 1.5
    },
    urlButton: {
        width: '100%', 
        padding: '12px', 
        marginTop: '16px',
        backgroundColor: '#007BFF', 
        color: 'white', 
        border: 'none',
        borderRadius: '5px', 
        cursor: 'pointer', 
        fontSize: '1rem', 
        fontWeight: 'bold',
        transition: 'background-color 0.2s', 
    },
  
    disabledButton: {
        backgroundColor: '#E0E0E0',
        color: '#A0A0A0',
        cursor: 'not-allowed',
    },
    closeButton: {
        width: '100%', 
        padding: '12px', 
        marginTop: '10px',
        backgroundColor: '#6c757d', 
        color: 'white', 
        border: 'none',
        borderRadius: '5px', 
        cursor: 'pointer', 
        fontSize: '1rem'
    }
} as const; 

export default PerformancePlaceModal;