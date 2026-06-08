
// Индикатор важности заметки
// возвращает css переменную
// просрочено - серый
// < 24ч - красный
// < 3 дней - желтый
// больше - зеленый
export function getTimeIndicator(deadline: string, now: number): string {
    const timeLeft = new Date(deadline).getTime() - now
    if (isNaN(timeLeft)) return 'var(--indicator-gray)'
    if (timeLeft < 0) return 'var(--indicator-gray)'
    if (timeLeft < 24 * 60 * 60 * 1000) return 'var(--indicator-red)'
    if (timeLeft < 3 * 24 * 60 * 60 * 1000) return 'var(--indicator-yellow)'
    return 'var(--indicator-green)'
}