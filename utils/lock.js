export function getLock() {
    var lock = window.localStorage.getItem("lock")
    if (lock == null || lock == 'false') {
        lock = 0
    }
    return lock
}

export function setLock(lock) {
    return window.localStorage.setItem("lock",lock)
}