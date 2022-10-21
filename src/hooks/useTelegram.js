const telegram = window.Telegram.WebApp;

export function useTelegram() {
    const close = () => {
        telegram.close();
    }

    return {
        telegram,
        close,
    };
}