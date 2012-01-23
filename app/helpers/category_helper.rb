module CategoryHelper

  def cat_icon(category)
    image_tag cat_icon_src(category)
  end

  def cat_icon_src(category)
    if category.is_a? User
      category.gravatar_src
    else
      asset_path "cat-icons/#{category.icon}_54px.png"
    end
  end

  def icon_names
    CATEGORY_ICON_NAMES
  end

end
