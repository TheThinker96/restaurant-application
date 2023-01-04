package com.chad.restaurant.service.impl;

import com.chad.restaurant.domain.StockProduit;
import com.chad.restaurant.repository.StockProduitRepository;
import com.chad.restaurant.service.StockProduitService;
import com.chad.restaurant.service.dto.StockProduitDTO;
import com.chad.restaurant.service.mapper.StockProduitMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link StockProduit}.
 */
@Service
@Transactional
public class StockProduitServiceImpl implements StockProduitService {

    private final Logger log = LoggerFactory.getLogger(StockProduitServiceImpl.class);

    private final StockProduitRepository stockProduitRepository;

    private final StockProduitMapper stockProduitMapper;

    public StockProduitServiceImpl(StockProduitRepository stockProduitRepository, StockProduitMapper stockProduitMapper) {
        this.stockProduitRepository = stockProduitRepository;
        this.stockProduitMapper = stockProduitMapper;
    }

    @Override
    public StockProduitDTO save(StockProduitDTO stockProduitDTO) {
        log.debug("Request to save StockProduit : {}", stockProduitDTO);
        StockProduit stockProduit = stockProduitMapper.toEntity(stockProduitDTO);
        stockProduit = stockProduitRepository.save(stockProduit);
        return stockProduitMapper.toDto(stockProduit);
    }

    @Override
    public StockProduitDTO update(StockProduitDTO stockProduitDTO) {
        log.debug("Request to update StockProduit : {}", stockProduitDTO);
        StockProduit stockProduit = stockProduitMapper.toEntity(stockProduitDTO);
        stockProduit = stockProduitRepository.save(stockProduit);
        return stockProduitMapper.toDto(stockProduit);
    }

    @Override
    public Optional<StockProduitDTO> partialUpdate(StockProduitDTO stockProduitDTO) {
        log.debug("Request to partially update StockProduit : {}", stockProduitDTO);

        return stockProduitRepository
            .findById(stockProduitDTO.getId())
            .map(existingStockProduit -> {
                stockProduitMapper.partialUpdate(existingStockProduit, stockProduitDTO);

                return existingStockProduit;
            })
            .map(stockProduitRepository::save)
            .map(stockProduitMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<StockProduitDTO> findAll(Pageable pageable) {
        log.debug("Request to get all StockProduits");
        return stockProduitRepository.findAll(pageable).map(stockProduitMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<StockProduitDTO> findOne(Long id) {
        log.debug("Request to get StockProduit : {}", id);
        return stockProduitRepository.findById(id).map(stockProduitMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete StockProduit : {}", id);
        stockProduitRepository.deleteById(id);
    }
}
