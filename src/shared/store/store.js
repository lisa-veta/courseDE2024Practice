import { createStore as create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";

/**
 * Функция для создания Store с уникальным именем
 * @param {string} storageName - Имя хранилища
 * @return {Function} - Функция, возвращающая Store
 */
export const createStore = (storageName) => {
  return create(
    subscribeWithSelector(
      persist(
        (set) => ({
          markers: [],
          activeFilters: {},
          setMarkers: (markers) => set({ markers }),
          addMarker: (marker) => {
            set((state) => {
              const updatedMarkers = state.markers.map((m) =>
                m.id === marker.id ? { ...m, ...marker } : m
              );
              if (updatedMarkers.every((m) => m.id !== marker.id)) {
                updatedMarkers.push(marker);
              }
              return { markers: updatedMarkers };
            });
          },
          addMarkers: (newMarkers) => {
            set((state) => {
              const updatedMarkers = [...state.markers];
              newMarkers.forEach((marker) => {
                const markerIndex = updatedMarkers.findIndex(
                  (m) => m.id === marker.id
                );
                if (markerIndex !== -1) {
                  updatedMarkers[markerIndex] = {
                    ...updatedMarkers[markerIndex],
                    ...marker,
                  };
                } else {
                  updatedMarkers.push(marker);
                }
              });
              return { markers: updatedMarkers };
            });
          },
          removeMarker: (markerId) =>
            set((state) => ({
              markers: state.markers.filter((marker) => marker.id !== markerId),
            })),
          removeMarkers: () => set({ markers: [] }),
          setFilters: (filters) => set({ activeFilters: filters }),
          removeFilters: () => set({ activeFilters: {} }),
        }),
        {
          name: storageName, // Используем переданное имя хранилища
          getStorage: () => localStorage,
        }
      )
    )
  );
};
