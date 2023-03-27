function initiateView(view: HTMLElement) {
    // TODO
}

function main() {
    console.log('Initiating Talk to ChatGPT extension.');
    const next = document.getElementById('__next');
    if (!next) {
        console.error('Could not find __next element, aborting.');
        return;
    }

    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (node instanceof HTMLElement) {
                    initiateView(node);
                }
            }
        }

    }
    ).observe(next, { childList: true });
    initiateView(next?.querySelector<HTMLElement>('div')!);
}

main();
