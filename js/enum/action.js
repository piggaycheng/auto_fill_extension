const actionType = {
    END: -1,
    NONE: 0,
    ADD_TEXT_INPUT: 1,
    CHECK_ALL_CHECKBOX: 2,
    CLICK: 3,
    SELECT_OPTION: 4,
    WAIT: 5,
}

const actionTypeText = {
    0: 'Select Action',
    1: 'add text input',
    2: 'check all checkbox',
    3: 'click',
    4: 'select option',
    5: 'wait',
}

Object.freeze(actionType);
Object.freeze(actionTypeText);

export {actionType, actionTypeText}