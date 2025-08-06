import { ListSubheader, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createContext, forwardRef, useContext, useEffect, useRef } from 'react'
import { ListChildComponentProps, VariableSizeList } from 'react-window'

export function ListboxComponent(props: React.HTMLAttributes<HTMLElement>) {
  const { children, ...other } = props
  const itemData: React.ReactElement<unknown>[] = []

  ;(children as React.ReactElement<unknown>[]).forEach(
    (
      item: React.ReactElement<unknown> & {
        children?: React.ReactElement<unknown>[]
      }
    ) => {
      itemData.push(item)
      itemData.push(...(item.children || []))
    }
  )

  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true
  })

  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = (child: React.ReactElement<unknown>) => {
    if (
      'props' in child &&
      typeof child.props === 'object' &&
      child.props &&
      'group' in child.props
    ) {
      return 48
    }
    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  // 内部自己管理 ref
  const divRef = useRef<HTMLDivElement>(null)
  const gridRef = useResetCache(itemCount)

  return (
    <div ref={divRef}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
}

function useResetCache(data: unknown) {
  const ref = useRef<VariableSizeList>(null)

  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])

  return ref
}

const OuterElementContext = createContext({})

const OuterElementType = forwardRef<HTMLDivElement>(function OuterElementType(props, ref) {
  const outerProps = useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

const LISTBOX_PADDING = 8 // px

/* Listbox 渲染每行 */
function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props
  const dataSet = data[index]
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING
  }

  if (dataSet.hasOwnProperty('group')) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    )
  }

  const { key, ...optionProps } = dataSet[0]

  return (
    <Typography key={key} component="li" {...optionProps} noWrap style={inlineStyle}>
      {dataSet[1]?.stock_name} ({dataSet[1]?.stock_id})
    </Typography>
  )
}
