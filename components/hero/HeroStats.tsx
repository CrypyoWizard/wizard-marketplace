import { FC } from 'react'
import FormatEth from 'components/FormatEth'
import { formatNumber } from 'lib/numbers'
import FormatWEth from 'components/FormatWEth'

type Props = {
  count: number
  topOffer: number | undefined
  floor: number | undefined
  vol24: number | undefined
  volumeChange: number | undefined
  floorChange: number | undefined
}

const HeroStats: FC<{ stats: Props }> = ({ stats }) => {
  return (
    <div className="grid min-w-full grid-cols-2 items-center gap-[1px] overflow-hidden rounded-lg border-[1px] border-gray-300 bg-gray-300 dark:border-[#525252] dark:bg-[#525252] md:m-0 md:h-[82px] md:min-w-[647px] md:grid-cols-4 md:gap-2 md:bg-white dark:md:bg-black">
      <Stat name="items">
        <h3 className="reservoir-h6 dark:text-white">
          {formatNumber(stats.count)}
        </h3>
      </Stat>
      <Stat name="top offer">
        <h3 className="reservoir-h6 dark:text-white">
          <FormatWEth amount={stats.topOffer} />
        </h3>
      </Stat>
      <Stat name="floor">
        <h3 className="reservoir-h6 flex items-center justify-center gap-1 dark:text-white">
          <FormatEth amount={stats.floor} maximumFractionDigits={2} />
          <PercentageChange value={stats.floorChange} />
        </h3>
      </Stat>
      <Stat name="24h">
        <h3 className="reservoir-h6 flex items-center justify-center gap-1 dark:text-white">
          <FormatEth amount={stats.vol24} maximumFractionDigits={2} />
          <PercentageChange value={stats.volumeChange} />
        </h3>
      </Stat>
    </div>
  )
}

const Stat: FC<{ name: string }> = ({ name, children }) => (
  <div className="flex h-20 flex-col items-center justify-center bg-white dark:bg-black md:h-auto">
    {children}
    <p className="mt-1 text-[#A3A3A3]">{name}</p>
  </div>
)

export const PercentageChange: FC<{ value: number | undefined | null }> = ({
  value,
}) => {
  if (value === undefined || value === null) return null

  const percentage = (value - 1) * 100

  if (percentage > 100 || value === 0) {
    return null
  }

  if (value < 1) {
    return (
      <div className="text-sm text-[#FF3B3B]">{formatNumber(percentage)}%</div>
    )
  }

  if (value > 1) {
    return (
      <div className="text-sm text-[#06C270]">+{formatNumber(percentage)}%</div>
    )
  }

  return null
}

export default HeroStats
