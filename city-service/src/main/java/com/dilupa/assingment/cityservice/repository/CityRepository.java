package com.dilupa.assingment.cityservice.repository;

import com.dilupa.assingment.cityservice.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City,Integer> {
}
