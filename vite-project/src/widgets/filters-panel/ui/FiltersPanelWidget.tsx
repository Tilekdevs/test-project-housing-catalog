import { FiltersPanel } from '../../../feature/filters/ui/FiltersPanel'

interface FiltersPanelWidgetProps {
	className?: string
}

export const FiltersPanelWidget = ({ className }: FiltersPanelWidgetProps) => {
	return (
		<div className={className}>
			<FiltersPanel />
		</div>
	)
}
