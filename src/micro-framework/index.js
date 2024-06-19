

function render(state) {
    return html`
    <div class="${state.color}" style="color:${state.color}">${state.text}</div>
  `
}

window.onload = () => {
    const container = document.getElementById('container')
    state.a = 4;
    state.b = 5;
    state.color =  'green';

    createEffect(() => {
        state.sum = state.a + state.b
    });

    createEffect(() => {
        state.text = `Sum is: ${state.sum}`
    })

    createEffect(() => {
        const dom = render(state)
        if (container.firstElementChild) {
            container.firstElementChild.replaceWith(dom)
        } else {
            container.appendChild(dom)
        }
    })
};