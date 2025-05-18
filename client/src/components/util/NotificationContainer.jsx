import {Toast, ToastContainer} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {notificationsStateSelector, removeNotification} from "../../store/notificationSlice";

export default function NotificationContainer() {
    const { notifications } = useSelector(notificationsStateSelector);
    const dispatch = useDispatch();

    if (notifications.length === 0) {
        return;
    }

    return (
        <ToastContainer containerPosition="fixed" position="bottom-start" className="m-3">
            {notifications.map(({ background, title, message }, idx) => (
                <Toast key={idx} onClose={() => dispatch(removeNotification(idx))}>
                    <Toast.Header className={background}>
                        <strong className="me-auto">{title}</strong>
                    </Toast.Header>
                    {message && (
                        <Toast.Body>
                            <p className="mb-0">{message}</p>
                        </Toast.Body>
                    )}
                </Toast>
            ))}
        </ToastContainer>
    )
}
