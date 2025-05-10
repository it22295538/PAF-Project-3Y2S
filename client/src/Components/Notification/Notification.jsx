// Components/Notification/Notification.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    getNotificationsAction, 
    markNotificationAsReadAction, 
    deleteNotificationAction,
    clearNotificationError
} from "../../Redux/Notification/Action";
import { timeDifference } from "../../Config/Logic";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'bootstrap';

const Notification = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { notification } = useSelector((store) => store);
    const token = localStorage.getItem("token");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('all');
    const [readNotifications, setReadNotifications] = useState(new Set());
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [justMarkedAsRead, setJustMarkedAsRead] = useState(null);

    // Reference for the modal
    const [modal, setModal] = useState(null);

    useEffect(() => {
        // Initialize Bootstrap modal
        const modalElement = document.getElementById('markAsReadModal');
        const bootstrapModal = new Modal(modalElement);
        setModal(bootstrapModal);
    }, []);
    useEffect(() => {
        dispatch(getNotificationsAction(token));
    }, [token, dispatch]);
    useEffect(() => {
        const readIds = new Set(
            notification.notifications
                .filter(item => item.isRead)
                .map(item => item.id)
        );
        setReadNotifications(readIds);
    }, [notification.notifications]);
    useEffect(() => {
        if (justMarkedAsRead) {
            const timer = setTimeout(() => {
                setJustMarkedAsRead(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [justMarkedAsRead]);
    useEffect(() => {
        if (notification.error) {
            toast.error(notification.error);
            dispatch(clearNotificationError());
        }
    }, [notification.error, dispatch]);

     const openMarkAsReadModal = (notification) => {
        setSelectedNotification(notification);
        modal?.show();
    };
    const handleMarkAsRead = async (notification) => {
        try {
            setLoading(true);
            await dispatch(markNotificationAsReadAction(notification.id));
            setReadNotifications(prev => new Set([...prev, notification.id]));
            setJustMarkedAsRead(notification.id);
            toast.success("Notification marked as read");
        } catch (error) {
            toast.error("Failed to mark notification as read");
        } finally {
            setLoading(false);
        }
    };
     const handleDelete = async (notificationId) => {
        try {
            setLoading(true);
            await dispatch(deleteNotificationAction(notificationId));
            toast.success("Notification deleted successfully");
        } catch (error) {
            toast.error("Failed to delete notification");
        } finally {
            setLoading(false);
        }
    };
    const handleNavigateToPost = (postId) => {
        if (postId) {
            navigate(`/p/${postId}`);
        }
    };
    const getNotificationIcon = (type) => {
        switch (type) {
            case 'LIKE':
                return (
                    <div className="rounded-full bg-red-100 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            case 'COMMENT':
                return (
                    <div className="rounded-full bg-blue-100 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                        </svg>
                    </div>
                );
            default:
                return null;
        }
    };
    const filterNotifications = () => {
        let filteredNotifications = [...notification.notifications];
        switch (activeTab) {
            case 'unread':
                return filteredNotifications.filter(item => !readNotifications.has(item.id));
            case 'read':
                return filteredNotifications.filter(item => readNotifications.has(item.id));
            default:
                return filteredNotifications;
        }
    };