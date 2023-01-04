package com.chad.restaurant.service.impl;

import com.chad.restaurant.domain.Credit;
import com.chad.restaurant.repository.CreditRepository;
import com.chad.restaurant.service.CreditService;
import com.chad.restaurant.service.dto.CreditDTO;
import com.chad.restaurant.service.mapper.CreditMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Credit}.
 */
@Service
@Transactional
public class CreditServiceImpl implements CreditService {

    private final Logger log = LoggerFactory.getLogger(CreditServiceImpl.class);

    private final CreditRepository creditRepository;

    private final CreditMapper creditMapper;

    public CreditServiceImpl(CreditRepository creditRepository, CreditMapper creditMapper) {
        this.creditRepository = creditRepository;
        this.creditMapper = creditMapper;
    }

    @Override
    public CreditDTO save(CreditDTO creditDTO) {
        log.debug("Request to save Credit : {}", creditDTO);
        Credit credit = creditMapper.toEntity(creditDTO);
        credit = creditRepository.save(credit);
        return creditMapper.toDto(credit);
    }

    @Override
    public CreditDTO update(CreditDTO creditDTO) {
        log.debug("Request to update Credit : {}", creditDTO);
        Credit credit = creditMapper.toEntity(creditDTO);
        credit = creditRepository.save(credit);
        return creditMapper.toDto(credit);
    }

    @Override
    public Optional<CreditDTO> partialUpdate(CreditDTO creditDTO) {
        log.debug("Request to partially update Credit : {}", creditDTO);

        return creditRepository
            .findById(creditDTO.getId())
            .map(existingCredit -> {
                creditMapper.partialUpdate(existingCredit, creditDTO);

                return existingCredit;
            })
            .map(creditRepository::save)
            .map(creditMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CreditDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Credits");
        return creditRepository.findAll(pageable).map(creditMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CreditDTO> findOne(Long id) {
        log.debug("Request to get Credit : {}", id);
        return creditRepository.findById(id).map(creditMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Credit : {}", id);
        creditRepository.deleteById(id);
    }
}
