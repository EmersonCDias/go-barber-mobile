export interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

export interface ProviderContainerProps {
  selected: boolean;
}

export interface ProviderNameProps {
  selected: boolean;
}

export interface AvailabilityItem {
  hour: number;
  available: boolean;
}
