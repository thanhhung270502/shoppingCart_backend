class Utils {
    getCurrentTimeFormatted() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const date = new Date();
        const hour = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedTime = `${hour}:${minutes}:${seconds} ${month} ${day}, ${year}`;
        return formattedTime;
    }

    formatDateTime = (datetimeStr) => {
        const dateTime = new Date(datetimeStr);

        // YYYY-MM-DD HH:mm:ss
        const formattedDateTime = dateTime
            .toISOString()
            .replace('T', ' ')
            .replace(/\.\d+Z$/, '');

        return formattedDateTime;
    };

    reFormatedTime = (time) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const date = new Date(time);
        const hour = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();

        const formattedTime = `${hour}:${minutes}:${seconds} ${month} ${day}, ${year}`;
        return formattedTime;
    };
}

module.exports = new Utils();

// module exports { getCurrentTimeFormatted, reFormatedTime, formatDateTime };
