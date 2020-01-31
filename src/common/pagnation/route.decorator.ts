import { createParamDecorator } from '@nestjs/common';

import { PaginationDefault } from './pagination-options.dto';

export const PaginationRoute = createParamDecorator((data, request): string => {
  const { originalUrl: pathname, protocol } = request;
  const host = process.env.DOMAIN;

  if (!pathname || !host || !protocol) {
    return;
  }

  const route = new URL(`${protocol}://${host}${pathname}`);
  Object.keys(PaginationDefault).map(e => route.searchParams.delete(e.toLowerCase()));

  return route.toString();
});
