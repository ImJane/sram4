<?php $this->context->layout = '@components/layout'; ?>

<?php $this->sram_require('./home.es6'); ?>
<?php $this->sram_require('./home.less'); ?>

<div class="views">
	<?= $this->sram_require('@components/header', ['data' => []]) ?>
	<div class="page">
		views/home/home.php
	</div>
</div>

<?php $this->block['js_placeholder']?>
<script type="text/javascript">undefined;

var _util = require("w/util/index.js");

sram.use(["w/util/index.js"]).then(function (_ref) {
	var util = _ref.util;
}).catch(function () {});</script>
<?php $this->endBlock['js_placeholder']?>

<?php $this->block['js_placeholder']?>
<script type="text/javascript">undefined;

var _util = require("w/util/index.js");

sram.use(["w/util/index.js"]).then(function (_ref) {
	var util = _ref.util;
}).catch(function () {});</script>
<?php $this->endBlock['js_placeholder']?>