import corgiGif from '../assets/corgi.gif'
import '../styles/OfflineOverlay.css'

function OfflineOverlay() {
    return (
        <div className="offline-overlay">
            <div className="offline-overlay__card">
                <img className="offline-overlay__gif" src={corgiGif} alt="корги" />
                <h2 className="offline-overlay__title">Нет соединения</h2>
                <p className="offline-overlay__text">Заметки в порядке — они хранятся локально</p>
            </div>
        </div>
    )
}

export default OfflineOverlay
