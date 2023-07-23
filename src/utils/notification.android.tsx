import PushNotification from "react-native-push-notification";


const showNotification = (data) => {
console.log('SHOW NOTIF')
    PushNotification.localNotification({
        channelId: '420',
        ...data
        // soundName: "ring2.mp3", // (optional) See `soundName` parameter of `localNotification` function
        // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more

    });
}

const handleScheduleNotification = (data) => {
    PushNotification.localNotificationSchedule({
        channelId: '420',
        date: new Date(Date.now() + 5 * 1000),
        ...data
    })
}

const handleCancel = () => {
    PushNotification.getChannels(function (channel_ids) {
        console.log(channel_ids); // ['channel_id_1']
      });

    PushNotification.cancelAllLocalNotifications();
}

export { showNotification, handleScheduleNotification, handleCancel}