package com.chad.restaurant.service.mapper;

import com.chad.restaurant.domain.Produit;
import com.chad.restaurant.domain.StockProduit;
import com.chad.restaurant.service.dto.ProduitDTO;
import com.chad.restaurant.service.dto.StockProduitDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link StockProduit} and its DTO {@link StockProduitDTO}.
 */
@Mapper(componentModel = "spring")
public interface StockProduitMapper extends EntityMapper<StockProduitDTO, StockProduit> {
    @Mapping(target = "produit", source = "produit", qualifiedByName = "produitId")
    StockProduitDTO toDto(StockProduit s);

    @Named("produitId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProduitDTO toDtoProduitId(Produit produit);
}
