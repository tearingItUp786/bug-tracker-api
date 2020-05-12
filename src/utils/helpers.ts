function hasValidKeys(obj: object, keys: string[]) {
    let valid = false;
    const objectKeys = Object.keys(obj);

    for (let i = 0; i < objectKeys.length; i++) {
        if (keys.includes(objectKeys[i])) {
            valid = true;
            break;
        }
    }

    return valid;
}

export { hasValidKeys };
