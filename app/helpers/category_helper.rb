module CategoryHelper

  def cat_icon(category)
    if category.is_a? User
      image_tag cat_icon_src(category)
    else
      image_tag cat_icon_src(category), :class => 'cat-icon'
    end
  end

  def cat_icon_src(category)
    if category.is_a? User
      category.gravatar_src
    else
      asset_path "cat-icons/#{category.icon}_54px.png"
    end
  end

end
