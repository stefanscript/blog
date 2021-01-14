---
title: Simple sortable solution for a list of items, vanilla javascript
date: "2021-01-14"
author: stefan
---

I needed to create a very simple solution for sorting a list of items. 

#### I started with a simple list with each element having it's own data id

    <ul class="simple-sortable">
        <li data-id="1">1 Bob</li>
        <li data-id="2">2 Frank</li>
        <li data-id="3">3 Sam</li>
        <li data-id="4">4 Zack</li>
    </ul>

#### the entire js needed (v1.0.1)
After a bit of research (thanks MDN) and a bit of tinkering I came out with this solution:

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

I ended up creating a small library - https://github.com/stefanscript/simple-sortable.

References:

Drag and drop MDN - https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
