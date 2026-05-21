
// функция которая считает прогресс времени, для плавного изменения цвета
// 0% - hsl 120 - зеленый
// 50% - hsl 60
// 100% - hsl 0
export function getProgressColor(createdAt: number, deadline: string): string {
    const total = new Date(deadline).getTime() - createdAt
    const elapsed = Date.now() - createdAt
    const percent = Math.min(Math.max(elapsed / total, 0), 1)

    const hue = Math.round(120 - percent * 120)
    return `hsl(${hue}, 80%, 50%)`
}