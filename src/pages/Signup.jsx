import React, { useEffect, useState } from "react"

const Spotify = () => {
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await fetch(
              
            );
    
            const json = await data.json();
          } catch (error) {
            console.error("Error fetching data:", error);
        };
    }
        fetchData();
      }, []);
}