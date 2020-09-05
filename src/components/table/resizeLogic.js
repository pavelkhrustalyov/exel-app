import {$} from '@core/dom';

export const resizeLogic = ($root, event) => {
    const resize = event.target.dataset.resize;

    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();

    $resizer.css({
        opacity: 1,
        zIndex: 1000,
        bottom: '-2000px',
        right: '-2000px',
    });

    document.onmousemove = (e) => {
        if (resize === 'col') {
            const delta = e.pageX - coords.right;
            $resizer.css({right: -delta + 'px'});
        } else {
            const delta = e.pageY - coords.bottom;
            $resizer.css({bottom: -delta + 'px'});
        }
    };

    document.onmouseup = (e) => {
        document.onmousemove = null;
        document.onmousedown = null;
        document.onmouseup = null;
        if (resize === 'col') {
            const delta = e.pageX - coords.right;
            const value = coords.width + delta;
            $root.findAll(
                `[data-col="${$parent.$el.dataset.col}"]`)
                .forEach((cell) => $(cell).css({width: value + 'px'}));

            $parent.css({width: value + 'px'});
        } else {
            const delta = e.pageY - coords.bottom;
            const value = coords.height + delta;
            $resizer.css({bottom: -delta + 'px'});
            $parent.css({height: value + 'px'});
        }
        $resizer.css({
            opacity: 0,
            bottom: 0,
            right: 0,
        });
    };
};
