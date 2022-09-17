package com.dilupa.assingment.cityservice.service;

import com.dilupa.assingment.cityservice.entity.City;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ICityService {
    public City loadCityById(int id) throws Exception;
    public City updateCityById(int id, City city) throws Exception;
    public List<City> getAll() throws Exception;
    public Page<City> getAllWithPagination(int offset, int pageSize) throws Exception;
}
