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