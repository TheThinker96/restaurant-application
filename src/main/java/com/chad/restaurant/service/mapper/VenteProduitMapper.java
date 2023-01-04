package com.chad.restaurant.service.mapper;

import com.chad.restaurant.domain.Produit;
import com.chad.restaurant.domain.StockProduit;
import com.chad.restaurant.domain.UserAccount;
import com.chad.restaurant.domain.VenteProduit;
import com.chad.restaurant.service.dto.ProduitDTO;
import com.chad.restaurant.service.dto.StockProduitDTO;
import com.chad.restaurant.service.dto.UserAccountDTO;
import com.chad.restaurant.service.dto.VenteProduitDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link VenteProduit} and its DTO {@link VenteProduitDTO}.
 */
@Mapper(componentModel = "spring")
public interface VenteProduitMapper extends EntityMapper<VenteProduitDTO, VenteProduit> {
    @Mapping(target = "produit", source = "produit", qualifiedByName = "produitId")
    @Mapping(target = "stockProduit", source = "stockProduit", qualifiedByName = "stockProduitId")
    @Mapping(target = "userAccount", source = "userAccount", qualifiedByName = "userAccountId")
    VenteProduitDTO toDto(VenteProduit s);

    @Named("produitId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProduitDTO toDtoProduitId(Produit produit);

    @Named("stockProduitId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StockProduitDTO toDtoStockProduitId(StockProduit stockProduit);

    @Named("userAccountId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserAccountDTO toDtoUserAccountId(UserAccount userAccount);
}
