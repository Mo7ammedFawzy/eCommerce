package com.site.ecommerce.models;

import jakarta.persistence.*;

@Embeddable
public enum Category
{
	ELECTRONICS, BOOKS, CLOTHING, HOME, TOYS
}
