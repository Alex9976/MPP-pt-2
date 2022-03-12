function getsignInRoot() {
    return `<form name="signIn" style="height:100%;">
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
                    <div class="text-center">
                        <h2>Sign in</h2>
                    </div>
                    <label class="mdc-text-field mdc-text-field--filled" style="margin-top:50px;>
                        <span class="mdc-text-field__ripple"></span>
                        <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Login</span>
                        <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" id="paperInputs1" name="login">
                    </label>
                    <label class="mdc-text-field mdc-text-field--filled" style="margin-top:20px;>
                        <span class="mdc-text-field__ripple"></span>
                        <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Password</span>
                        <input class="mdc-text-field__input" type="password" aria-labelledby="my-label-id" id="paperInputs2" name="password">
                    </label>
                    <div>
                        <button class="mdc-button mdc-button--touch" style="margin-top:20px;>
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__touch"></span>
                            <span class="mdc-button__label">Sign In</span>
                        </button>
                        <a class="mdc-button mdc-button--touch" style="margin-top:20px;" id="sup">
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__touch"></span>
                            <span class="mdc-button__label">Sign Up</span>
                        </a>
                    </div>
                </div>
                
            </form>`
}

function getsignUpRoot() {
    return `<form name="signUp" style="height:100%;">
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
                    <div class="text-center">
                        <h2>Sign up</h2>
                    </div>
                    <label class="mdc-text-field mdc-text-field--filled" style="margin-top:50px;>
                        <span class="mdc-text-field__ripple"></span>
                        <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Login</span>
                        <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" id="paperInputs1" name="login">
                    </label>
                    <label class="mdc-text-field mdc-text-field--filled" style="margin-top:20px;>
                        <span class="mdc-text-field__ripple"></span>
                        <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Password</span>
                        <input class="mdc-text-field__input" type="password" aria-labelledby="my-label-id" id="paperInputs2" name="password">
                    </label>
                    <div>
                        <button class="mdc-button mdc-button--touch" style="margin-top:20px;>
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__touch"></span>
                            <span class="mdc-button__label">Sign Up</span>
                        </button>
                        <a class="mdc-button mdc-button--touch" style="margin-top:20px;" id="sin">
                            <span class="mdc-button__ripple"></span>
                            <span class="mdc-button__touch"></span>
                            <span class="mdc-button__label">Sign In</span>
                        </a>
                    </div>
                </div>
            </form>`
}


function getTableRoot(rows) {
    return `<div class="mdc-data-table__table-container">
                <table class="mdc-data-table__table" aria-label="Tasks">
                    <tbody class="mdc-data-table__content">
                    ${rows}
                    </tbody>
                </table>
            </div>`
}

function getNewTaskRoot() {
    return `<div class="mdc-data-table__table-container" style="position:fixed;bottom:5px;">
                <form enctype="multipart/form-data" name="add-task">
                    <table class="mdc-data-table__table" aria-label="Add task">
                        <tbody class="mdc-data-table__content">
                            <tr class="mdc-data-table__row">
                            <th class="mdc-data-table__cell" scope="row">
                                <label class="mdc-text-field mdc-text-field--filled">
                                    <span class="mdc-text-field__ripple"></span>
                                    <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Task name</span>
                                    <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" placeholder="Task name" name="task-name">
                                </label>
                            </th>                   
                            <th class="mdc-data-table__cell" scope="row">
                                <label class="mdc-text-field mdc-text-field--filled">
                                    <span class="mdc-text-field__ripple"></span>
                                    <span class="mdc-floating-label" id="my-label-id" style="bottom:-20px;">Task description</span>
                                    <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" placeholder="Task description" name="task-description">
                                </label>
                            </th>
                            <th class="mdc-data-table__cell" scope="row">
                                <label class="mdc-text-field mdc-text-field--filled">
                                    <span class="mdc-text-field__ripple"></span>
                                    <input class="mdc-text-field__input" aria-labelledby="my-label-id" type="datetime-local" placeholder="Task expires" name="task-expires" value="${moment().format('YYYY-MM-DDTHH:mm')}">
                                </label>
                            </th>
                            <th class="mdc-data-table__cell" scope="row">
                                <label class="mdc-text-field mdc-text-field--filled">
                                    <span class="mdc-text-field__ripple"></span>
                                    <input class="mdc-text-field__input" type="file" name="task-files">
                                </label>
                            </th>
                            <th class="mdc-data-table__cell" scope="row">
                                <div class="mdc-touch-target-wrapper">
                                    <button class="mdc-button mdc-button--touch" name="add-task">
                                        <span class="mdc-button__ripple"></span>
                                        <span class="mdc-button__touch"></span>
                                        <span class="mdc-button__label">Add</span>
                                    </button>
                                </div>
                            </th>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>`
}

function getTask(task) {
    let dayDiff = (new Date(task.expires).getTime() - (new Date()).getTime()) / (1000 * 3600 * 24);
    let spanTag = "";
    if (task.isComplete) {
        spanTag = '<h5><span class="badge badge-success" style="color:Green;">Complete</span></h5>';
    } else if (dayDiff > 0) {
        spanTag = '<h5><span class="badge badge-warning" style="color:Orange;">Soon</span></h5>';
    } else if (dayDiff <= 0) {
        spanTag = '<h5><span class="badge badge-danger" style="color:Red;">Expired</span></h5>';
    }

    let expiredTag = "";
    if (!task.isComplete) {
        const date = moment(task.expires).format("DD.MM.YYYY HH:mm")
        expiredTag = `<td class="mdc-data-table__cell">Expires: ${date}</td>`
    }
    else {
        expiredTag = `<td class="mdc-data-table__cell" />`
    }

    let fileTag = "";
    if (task.file !== undefined) {
        fileTag = `<td class="mdc-data-table__cell">Attached file: <a href="download/${task.id}/${task.file.filename}">${task.file.originalname}</a></td>`;
    }
    else {
        fileTag = `<td class="mdc-data-table__cell" />`
    }

    let options = "";
    if (!task.isComplete) {
        options = `<td class="mdc-data-table__cell">
            <div name="completeTask">
                <div class="mdc-touch-target-wrapper">
                    <button class="mdc-button mdc-button--touch" id="complete-${task.id}">
                        <span class="mdc-button__ripple"></span>
                        <span class="mdc-button__touch"></span>
                        <span class="mdc-button__label">Complete</span>
                    </button>
                </div>
            </div>
        </td>`
    }
    else {
        options = `<td class="mdc-data-table__cell" />`
    }

    return `<tr class="mdc-data-table__row">
                <th class="mdc-data-table__cell" scope="row">${task.name}</th>
                <td class="mdc-data-table__cell mdc-data-table__cell--numeric">${task.description}</td>
                <td class="mdc-data-table__cell mdc-data-table__cell--numeric">${spanTag}</td>
                ${expiredTag}
                ${fileTag}
                ${options}
                <td class="mdc-data-table__cell">
                    <div>
                        <div class="mdc-touch-target-wrapper">
                            <button class="mdc-button mdc-button--touch" name="delete-task" id="delete-${task.id}">
                                <span class="mdc-button__ripple"></span>
                                <span class="mdc-button__touch"></span>
                                <span class="mdc-button__label">Delete</span>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>`;
}