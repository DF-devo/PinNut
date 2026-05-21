// фунция превращает время дедлайна в читаемый текст

export function formatDeadline(deadline: string): string {
    const diff = new Date(deadline).getTime() - Date.now()
    const absDiff = Math.abs(diff)

    const minutes = Math.floor(absDiff / 1000 / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (diff < 0) return 'Просрочено'
    if (minutes < 60) return `Через ${minutes} мин`
    if (hours < 24) return `Через ${hours} ч`
    if (days === 1) return 'Завтра'
    if (days < 7) return `Через ${days} дн`
    return new Date(deadline).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
    })
}