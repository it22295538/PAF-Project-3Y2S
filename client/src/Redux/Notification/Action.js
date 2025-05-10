// Redux/Notification/Action.js
import { BASE_URL } from "../../Config/api";
import {
    GET_NOTIFICATIONS,

} from "./ActionType";

export const getNotificationsAction = (token) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/api/notifications/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch notifications');
        }

        const notifications = await res.json();
        dispatch({ type: GET_NOTIFICATIONS, payload: notifications });
    } catch (error) {
        dispatch({ type: NOTIFICATION_ERROR, payload: error.message });
    }
};