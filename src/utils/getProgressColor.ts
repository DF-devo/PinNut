
// функция которая считает прогресс времени, для плавного изменения цвета
// 0% - hsl 120 - зеленый
// 50% - hsl 60
// 100% - hsl 0
export function getProgressColor(createdAt: number, deadline: string, now: number): string {
    const total = new Date(deadline).getTime() - createdAt
    if (total <= 0) return 'hsl(0, 80%, 50%)'
    const elapsed = now - createdAt
    const percent = Math.min(Math.max(elapsed / total, 0), 1)
    const hue = Math.round(120 - percent * 120)
    return `hsl(${hue}, 80%, 50%)`
}