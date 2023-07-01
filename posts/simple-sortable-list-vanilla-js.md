---
title: Simple sortable solution for a list of items using vanilla javascript
date: "2021-01-14"
author: stefan
---

I needed to create a very simple solution for sorting a list of items.

#### I started with a list, each element having it's own id

    <ul class="simple-sortable">
        <li data-id="1">1 Bob</li>
        <li data-id="2">2 Frank</li>
        <li data-id="3">3 Sam</li>
        <li data-id="4">4 Zack</li>
    </ul>

#### Next I had a look at the [Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

Here I discovered the events that I could use for my simple example: _dragstart, dragenter and dragend_.
In order to use these events, I needed to set `draggable` on each of the list items.
I decided to set the attribute using javascript:

    item.setAttribute("draggable", true);

#### dragstart

    item.addEventListener("dragstart", (e) => {
        dragged = e.target;
    })

When this event fires you know that `e.target` is the element that is being dragged.

#### dragenter

    item.addEventListener("dragenter", (e) => {
        if (dragged !== e.target) {
            target = e.target;
        }
    })

`dragenter` fires when you touch elements of the list.
`e.target` is the element that is being touched by your dragged
element.

#### dragend

    item.addEventListener("dragend", (e) => {
        if (target) {
            if (draggedY < target.getBoundingClientRect().y) {
                dragged.parentNode.removeChild(dragged);
                target.after(dragged);
            } else {
                dragged.parentNode.removeChild(dragged);
                target.before(dragged);
            }
        }
    })

Finally on dragend you can start to rearrange the elements that are affected by the new order

#### All together now

![Simple sortable 1.0](/images/simple-sortable1.0.gif)

And the js

    function SimpleSortable(newOrderHandler) {
        window.addEventListener("load", () => {
            let dragged;
            let draggedY;
            let target;
            let selectorItems = ".simple-sortable li";
            const list = document.querySelectorAll(selectorItems);
            list.forEach((item) => {
                item.setAttribute("draggable", true);
                item.addEventListener("dragstart", (e) => {
                    dragged = e.target;
                    draggedY = dragged.getBoundingClientRect().y;
                    dragged.style.border = "1px solid #000";
                });

                item.addEventListener("dragenter", (e) => {
                    if (dragged !== e.target) {
                        target = e.target;
                    }
                });

                item.addEventListener("dragend", (e) => {
                    e.preventDefault();
                    if (target) {
                        if (draggedY < target.getBoundingClientRect().y) {
                            dragged.parentNode.removeChild(dragged);
                            target.after(dragged);
                        } else {
                            dragged.parentNode.removeChild(dragged);
                            target.before(dragged);
                        }
                    }

                    dragged.style.border = "0";

                    let newOrder = [];
                    document.querySelectorAll(selectorItems).forEach(a => {
                        newOrder.push(a.dataset.id);
                    });
                    newOrderHandler(newOrder);
                }, false);
            });
        });
    }

I ended up creating a small library - [https://github.com/stefanscript/simple-sortable](https://github.com/stefanscript/simple-sortable).

References:

Drag and drop MDN - [https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
