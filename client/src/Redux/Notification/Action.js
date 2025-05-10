// Redux/Notification/Action.js
import { BASE_URL } from "../../Config/api";
import {
    GET_NOTIFICATIONS,
    GET_UNREAD_NOTIFICATIONS,
    MARK_NOTIFICATION_AS_READ,
    DELETE_NOTIFICATION,



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
export const getUnreadNotificationsAction = (token) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_URL}/api/notifications/unread`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to fetch unread notifications');
        }

        const notifications = await res.json();
        dispatch({ type: GET_UNREAD_NOTIFICATIONS, payload: notifications });
    } catch (error) {
        dispatch({ type: NOTIFICATION_ERROR, payload: error.message });
    }

};
export const markNotificationAsReadAction = (notificationId) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/notifications/read/${notificationId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to mark notification as read');
        }

        const notification = await res.json();
        dispatch({ type: MARK_NOTIFICATION_AS_READ, payload: notification });
        return notification;
    } catch (error) {
        dispatch({ type: NOTIFICATION_ERROR, payload: error.message });
        throw error;
    }
};
export const deleteNotificationAction = (notificationId) => async (dispatch) => {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/notifications/delete/${notificationId}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to delete notification');
        }

        dispatch({ type: DELETE_NOTIFICATION, payload: notificationId });
    } catch (error) {
        dispatch({ type: NOTIFICATION_ERROR, payload: error.message });
        throw error;
    }
};