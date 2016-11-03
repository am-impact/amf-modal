# Amf Modal 1.3.2

## Example 1
``` js
newModal = new FW.Modal({
    content: document.getElementById('modalElement'),
    maxWidth: 600
});

newModal.open();
```

## Example 2
> Uses jQuery

``` html
<span data-openmodal="foo-modal">Open modal</span>
<div class="visuallyhidden" data-modal="foo-modal" data-modal-closebutton="false">
    Modal content
    <div><span class="button" data-closemodal>Sluit</span></div>
</div>
```

## Options
``` js
// Show close button
closeButton: true

// Content: string or DOM element
content: ''

// Max width: $modal-width-full when null
maxWidth: null

// Min width
minWidth: null

// Show overlay
overlay: true

// Show confirm box when closing
confirmOnClose: false

// Text in cofirm box when closing
confirmOnCloseText: 'Weet u zeker dat u dit venster wilt sluiten?'

// Copy form values from origin to modal and vice versa
copyFormValues: true,

// Callback when closing modal
onClose: null

// Callback when opening modal
onOpen: null
```