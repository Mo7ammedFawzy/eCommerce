package com.site.ecommerce.utils;

import com.site.ecommerce.models.Category;

public class ProductUtils
{
	public static boolean isValidCategory(String category)
	{
		try
		{
			Category ct = Category.valueOf(category.toUpperCase());
			return true;
		}
		catch (IllegalArgumentException e)
		{
			return false;
		}
	}
}
