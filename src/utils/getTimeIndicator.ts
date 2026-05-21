export function getTimeIndicator(deadline: string): string {
    const timeLeft = new Date(deadline).getTime() - Date.now()

    if (timeLeft < 0) return 'var(--indicator-gray)'
    if (timeLeft < 24 * 60 * 60 * 1000) return 'var(--indicator-red)'
    if (timeLeft < 3 * 24 * 60 * 60 * 1000) return 'var(--indicator-yellow)'
    return 'var(--indicator-green)'
}