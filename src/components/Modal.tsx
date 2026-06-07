// Переиспользуемое модальное окно: затемнение фона + кнопка закрытия справа сверху
import { useState, type ReactNode } from 'react'

interface ModalProps {
    title: string
    onClose: () => void
    children: ReactNode
}

function Modal({ title, onClose, children }: ModalProps) {
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            onClose()
        }, 200)
    }

    return (
        <div className={`modal-overlay${isClosing ? ' modal-overlay--closing' : ''}`} onClick={handleClose}>
            <div className={`modal${isClosing ? ' modal--closing' : ''}`} onClick={e => e.stopPropagation()}>
                <div className="modal__header">
                    <h2 className="modal__title">{title}</h2>
                    <button className="modal__close" onClick={handleClose} aria-label="Закрыть">✕</button>
                </div>
                <div className="modal__body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal