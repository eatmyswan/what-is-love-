

G = TM.Gallery =

  # This function is used to extend Galleria.
  # The scope of `this` is the Galleria object.
  extension: (objectType, objectId) ->
    return ->
      gallery = this
      deleteBtn = $('<div>').addClass('galleria-delete').click ->
        imageId = $( gallery.getData().original ).data('id')
        G.deleteImage objectType, objectId, imageId

      buttonBar = $ this.get('bar')
      buttonBar.find('.galleria-thumblink').after deleteBtn
      buttonBar.find('.galleria-s4').after $('<div>').addClass('galleria-s5')
      buttonBar.find('.galleria-info').after deleteBtn

  deleteImage: (objectType, objectId, imageId) ->
    path = TM.path["#{objectType}Image"](objectId, imageId)
    $.post path, { _method:'delete' }
