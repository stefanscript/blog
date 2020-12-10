---
title: How to mock localStorage methods in your unit tests, using jest.fn
date: "2020-12-08"
author: stefan
---

I don't remember the amount of times I had to this, so I might as well make a note of it.
One way of mocking the localStorage methods is to spy on the prototype, e.g. for setItem use:

    jest.spyOn(Storage.prototype, "setItem")
