const telegram = window.Telegram.WebApp;

export function useTelegram() {
    const close = () => {
        telegram.close();
    }

    const user = telegram.initDataUnsafe.user;

    return {
        telegram,
        user,
        close,
    };
}