import { SetMetadata } from "@nestjs/common/decorators"

export const SERVER_SECRET_KEY = "QWHJFiughfiqb171b87y13rb3r1ha;11.412.'3tb2r;affwaef"
export const SERVER_REFRESH_SECRET_KEY = "UIQqhbb1p.r13bru34iu134yrfbanwfWQAEFq23891bl.iuh324"
export const PUBLIC_KEY = "isPublic"
// Custom decorator de set metadata cho handler
export const Public = () => SetMetadata(PUBLIC_KEY, true)